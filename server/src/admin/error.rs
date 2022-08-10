use poem::error::ResponseError;
use poem::http::StatusCode;

#[derive(Debug, thiserror::Error)]
pub enum AdminError {
    #[error("Unauthorized")]
    Unauthorized,
    #[error("{0}")]
    BadRequest(String),
    #[error("Not found")]
    NotFound,
    #[error("{0}")]
    InternalServerError(String),
}

impl ResponseError for AdminError {
    fn status(&self) -> StatusCode {
        match self {
            AdminError::Unauthorized => StatusCode::UNAUTHORIZED,
            AdminError::BadRequest(_) => StatusCode::BAD_REQUEST,
            AdminError::NotFound => StatusCode::NOT_FOUND,
            AdminError::InternalServerError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}
