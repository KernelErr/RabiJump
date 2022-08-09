use chrono::{DateTime, Utc};
use serde::{Serialize, Deserialize};
use sled::transaction::TransactionError;
use crate::CONFIG;
use spdlog::prelude::*;
use anyhow::Result;

#[derive(Debug, Serialize, Deserialize)]
pub struct Redirect {
    pub name: String,
    pub desc: Option<String>,
    pub target: String,
    pub mobile_target: Option<String>,
    pub status_code: Option<u16>,
    pub active: bool,
    pub allow_parameters: bool,
    pub last_modified: Option<DateTime<Utc>>,
}

impl Redirect {
    // pub fn new(
    //     name: String,
    //     desc: Option<String>,
    //     target: String,
    //     mobile_target: Option<String>,
    //     active: bool,
    //     allow_parameters: bool,
    //     last_modified: Option<DateTime<Utc>>,
    // ) -> Redirect {
    //     Redirect {
    //         name,
    //         desc,
    //         target,
    //         mobile_target,
    //         status_code: None,
    //         active,
    //         allow_parameters,
    //         last_modified,
    //     }
    // }

    pub fn get_by_name(name: &str) -> Result<Option<Redirect>> {
        let db = CONFIG.get_db("redirects");
        let key = format!("{}", name);
        let record = db.get(key.as_bytes());
        match record {
            Ok(Some(value)) => {
                let record: Redirect = bincode::deserialize(&value).unwrap();
                Ok(Some(record))
            }
            Ok(None) => Ok(None),
            Err(e) => {
                error!("Failed to get redirect {}: {}", name, e);
                Err(e.into())
            }
        }
    }

    pub fn get_visit_by_name(name: &str) -> Result<i64> {
        let db = CONFIG.get_db("analysis");
        let key = format!("{}", name);
        let record = db.get(key.as_bytes());
        match record {
            Ok(Some(value)) => {
                let record: i64 = bincode::deserialize(&value).unwrap();
                Ok(record)
            }
            Ok(None) => Ok(0),
            Err(e) => {
                error!("Failed to get visit count for redirect {}: {}", name, e);
                Err(e.into())
            }
        }
    }

    pub fn save(&self) -> Result<()> {
        let db = CONFIG.get_db("redirects");
        let key = format!("{}", self.name);
        let value = bincode::serialize(self).unwrap();
        match db.insert(key.as_bytes(), value) {
            Ok(_) => Ok(()),
            Err(e) => {
                error!("Failed to save redirect {}: {}", self.name, e);
                Err(e.into())
            }
        }
    }

    pub fn visit(&self) -> Result<()> {
        let db = CONFIG.get_db("analysis");
        let key = format!("{}", self.name);
        let result: Result<(), TransactionError<sled::transaction::UnabortableTransactionError>> = db.transaction(|db| {
            let value = db.get(key.as_bytes())?;
            if let Some(v) = value {
                let mut count: i64 = bincode::deserialize(&v).unwrap();
                count += 1;
                db.insert(key.as_bytes(), bincode::serialize(&count).unwrap())?;
            } else {
                db.insert(key.as_bytes(), bincode::serialize(&1i64).unwrap())?;
            }
            Ok(())
        });
        match result {
            Ok(_) => Ok(()),
            Err(e) => {
                error!("Failed to count visit {}: {}", self.name, e);
                Err(e.into())
            }
        }
    }

    pub fn delete(name: &str) -> Result<()> {
        let redirect_db = CONFIG.get_db("redirects");
        let analysis_db = CONFIG.get_db("analysis");
        let key = format!("{}", name);
        redirect_db.remove(key.as_bytes())?;
        analysis_db.remove(key.as_bytes())?;
        Ok(())
    }

    pub fn list(count: i32, skip: i32) -> Result<Vec<Redirect>> {
        let db = CONFIG.get_db("redirects");
        let mut records = Vec::new();
        let mut iter = db.iter();
        let mut skip_count = 0;
        while let Some(Ok((_, v))) = iter.next() {
            if skip_count < skip {
                skip_count += 1;
                continue;
            }
            let record: Redirect = bincode::deserialize(&v)?;
            records.push(record);
            if records.len() >= count as usize {
                break;
            }
        }
        Ok(records)
    }

    pub fn search_by_prefix(prefix: &str) -> Result<Vec<Redirect>> {
        let db = CONFIG.get_db("redirects");
        let prefix = prefix.as_bytes();
        let mut records = Vec::new();
        let mut iter = db.scan_prefix(prefix);
        while let Some(Ok((_, v))) = iter.next() {
            let record: Redirect = bincode::deserialize(&v)?;
            records.push(record);
        }
        Ok(records)
    }
}

impl Default for Redirect {
    fn default() -> Redirect {
        Redirect {
            name: String::new(),
            desc: None,
            target: String::new(),
            mobile_target: None,
            status_code: None,
            active: true,
            allow_parameters: false,
            last_modified: Some(Utc::now()),
        }
    }
}
