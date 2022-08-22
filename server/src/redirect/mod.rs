mod error;
mod model;
pub use model::Redirect;

use crate::redirect::error::RedirectError;
use crate::CONFIG;
use poem::{
    handler,
    http::StatusCode,
    http::{HeaderMap, Uri},
    web::{Path, RealIp, Redirect as poemRedirect},
    IntoResponse, Response, Result,
};
use spdlog::prelude::*;
use std::fmt::Write;
use woothee::parser::Parser;

fn write_log(ip: RealIp, mobile: bool, target: &str, uri: &Uri, header: &HeaderMap) {
    let logger = CONFIG.logger.clone();
    let mut log_line = String::new();

    if let Some(ip) = ip.0 {
        let _ = write!(log_line, "{} - ", ip);
    } else {
        let _ = write!(log_line, "- - ");
    }

    let _ = write!(
        log_line,
        "\"{}\" \"{}\" {} ",
        &uri.path(),
        target,
        if mobile { "mobile" } else { "other" }
    );

    if let Some(ua) = header.get("user-agent") {
        let _ = write!(log_line, "\"{}\" ", ua.to_str().unwrap());
    } else {
        let _ = write!(log_line, "- ");
    }

    if let Some(referer) = header.get("referer") {
        let _ = write!(log_line, "\"{}\" ", referer.to_str().unwrap());
    } else {
        let _ = write!(log_line, "- ");
    }

    info!(logger: logger, "{}", log_line);
}

#[handler]
pub fn redirect(
    Path(name): Path<String>,
    uri: &Uri,
    header: &HeaderMap,
    ip: RealIp,
) -> Result<Response, RedirectError> {
    let redirect = match Redirect::get_by_name(&name) {
        Ok(Some(r)) => {
            if r.active {
                r
            } else {
                if let Some(fallback) = CONFIG.get_fallback_target() {
                    return Ok(poemRedirect::temporary(fallback).into_response());
                } else {
                    return Err(RedirectError::NotFound);
                }
            }
        },
        Ok(None) => {
            if let Some(fallback) = CONFIG.get_fallback_target() {
                return Ok(poemRedirect::temporary(fallback).into_response());
            } else {
                return Err(RedirectError::NotFound);
            }
        }
        Err(e) => {
            error!("Failed to get redirect {}: {}", name, e);
            return Err(RedirectError::InternalServerError(format!("{}", e)));
        }
    };

    if let Err(e) = redirect.visit() {
        warn!("Failed to update redirect count {}: {}", name, e);
    }

    if let Some(mobile_target) = redirect.mobile_target {
        if let Some(ua) = header.get("user-agent") {
            let ua = ua.to_str().unwrap();
            let parser = Parser::new();
            let result = parser.parse(ua);
            if let Some(result) = result {
                if result.category.contains("phone") {
                    let target = if redirect.allow_parameters && uri.query().is_some() {
                        format!("{}?{}", mobile_target, uri.query().unwrap())
                    } else {
                        mobile_target
                    };
                    write_log(ip, true, &target, uri, header);
                    return Ok(Response::builder()
                        .status(
                            StatusCode::from_u16(redirect.status_code.unwrap_or(301))
                                .unwrap_or(StatusCode::MOVED_PERMANENTLY),
                        )
                        .header("Location", target)
                        .finish());
                }
            }
        }
    }

    let target = if redirect.allow_parameters && uri.query().is_some() {
        format!("{}?{}", redirect.target, uri.query().unwrap())
    } else {
        redirect.target
    };

    write_log(ip, false, &target, uri, header);
    Ok(Response::builder()
        .status(
            StatusCode::from_u16(redirect.status_code.unwrap_or(301))
                .unwrap_or(StatusCode::MOVED_PERMANENTLY),
        )
        .header("Location", target)
        .finish())
}
