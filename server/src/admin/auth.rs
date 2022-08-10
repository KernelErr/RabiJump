use crate::admin::AdminError;
use crate::CONFIG;
use poem::{
    web::{
        headers,
        headers::{authorization::Bearer, HeaderMapExt},
    },
    Endpoint, Middleware, Request, Result,
};

pub struct TokenMiddleware;

impl<E: Endpoint> Middleware<E> for TokenMiddleware {
    type Output = TokenMiddlewareImpl<E>;

    fn transform(&self, ep: E) -> Self::Output {
        TokenMiddlewareImpl { ep }
    }
}

pub struct TokenMiddlewareImpl<E> {
    ep: E,
}

#[poem::async_trait]
impl<E: Endpoint> Endpoint for TokenMiddlewareImpl<E> {
    type Output = E::Output;

    async fn call(&self, req: Request) -> Result<Self::Output> {
        if let Some(auth) = req.headers().typed_get::<headers::Authorization<Bearer>>() {
            if auth.token().eq(&CONFIG.get_token()) {
                return self.ep.call(req).await;
            }
        }
        Err(AdminError::Unauthorized.into())
    }
}
