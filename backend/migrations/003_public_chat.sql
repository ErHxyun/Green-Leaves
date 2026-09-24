CREATE TABLE public_chat_usage (
 usage_day date PRIMARY KEY,
 calls integer NOT NULL DEFAULT 0 CHECK (calls >= 0)
);
