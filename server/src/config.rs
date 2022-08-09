use passwords::PasswordGenerator;
use std::env;
use std::fs;
use spdlog::prelude::*;

#[derive(Debug, Clone)]
pub struct Config {
    database: sled::Db,
    log_path: String,
    manage_token: String,
    fallback_target: Option<String>,
}

impl Config {
    pub fn env() -> Config {
        let manage_token = env::var("TOKEN").unwrap_or(
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
                .unwrap(),
        );
        if env::var("TOKEN").is_err() {
            info!("Generated manage token: {}", manage_token);
        }

        let database: sled::Db = sled::open(env::var("DATABASE_PATH").unwrap_or("./database".to_string())).unwrap();
        let log_path = env::var("LOG_PATH").unwrap_or("./logs".to_string());
        let fallback_target = env::var("FALLBACK_TARGET").ok();

        fs::create_dir_all(&log_path).unwrap();

        Config {
            database,
            log_path,
            manage_token,
            fallback_target,
        }
    }

    pub fn get_db(&self, tree: &str) -> sled::Tree {
        self.database.clone().open_tree(tree).unwrap()
    }

    // pub fn get_db_raw(&self) -> sled::Db {
    //     self.database.clone()
    // }

    pub fn get_fallback_target(&self) -> Option<String> {
        self.fallback_target.clone()
    }
}
