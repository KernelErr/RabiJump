use passwords::PasswordGenerator;
use spdlog::prelude::*;
use spdlog::sink::{RotatingFileSink, RotationPolicy};
use std::env;
use std::fs;
use std::path::PathBuf;
use std::sync::Arc;

#[derive(Clone)]
pub struct Config {
    database: sled::Db,
    manage_token: String,
    allow_origin: Option<String>,
    fallback_target: Option<String>,
    pub logger: Arc<Logger>,
}

impl Config {
    pub fn env() -> Config {
        let manage_token = env::var("TOKEN").unwrap_or_else(|_| {
            PasswordGenerator::new()
                .length(32)
                .numbers(true)
                .lowercase_letters(true)
                .uppercase_letters(true)
                .symbols(false)
                .spaces(false)
                .exclude_similar_characters(true)
                .strict(true)
                .generate_one()
                .unwrap()
        });

        let database: sled::Db =
            sled::open(env::var("DATABASE_PATH").unwrap_or_else(|_| "./database".to_string()))
                .unwrap();
        let log_path = env::var("LOG_PATH").unwrap_or_else(|_| "./logs".to_string());
        let fallback_target = env::var("FALLBACK_TARGET").ok();

        fs::create_dir_all(&log_path).unwrap();

        let visit_log_path = PathBuf::from(&log_path).join("visit.log");
        let log_sink: Arc<RotatingFileSink> = Arc::new(
            RotatingFileSink::new(
                visit_log_path,
                RotationPolicy::Daily { hour: 0, minute: 0 },
                0,
                false,
            )
            .unwrap(),
        );
        let logger: Arc<Logger> = Arc::new(
            Logger::builder()
                .sink(log_sink)
                .flush_level_filter(LevelFilter::MoreSevereEqual(Level::Warn))
                .build(),
        );
        logger.set_flush_period(Some(std::time::Duration::from_secs(10)));

        Config {
            database,
            manage_token,
            allow_origin: env::var("ALLOW_ORIGIN").ok(),
            fallback_target,
            logger,
        }
    }

    pub fn get_db(&self, tree: &str) -> sled::Tree {
        self.database.clone().open_tree(tree).unwrap()
    }

    pub fn get_allow_origin(&self) -> Option<String> {
        self.allow_origin.clone()
    }

    // pub fn get_db_raw(&self) -> sled::Db {
    //     self.database.clone()
    // }

    pub fn get_fallback_target(&self) -> Option<String> {
        self.fallback_target.clone()
    }

    pub fn get_token(&self) -> String {
        self.manage_token.clone()
    }
}
