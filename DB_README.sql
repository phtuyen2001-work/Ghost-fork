CREATE TABLE infras (
	id VARCHAR(24) NOT NULL PRIMARY KEY,
	name VARCHAR(191) NOT NULL,
	slug VARCHAR(191) NOT NULL,
	CONSTRAINT uc_slug UNIQUE (slug)
)

INSERT INTO infras VALUES
	('00001', 'W3 Storage', 'w3s'),
	('00002', 'W3 AI', 'w3ai')


CREATE TABLE posts_infras (
	id VARCHAR(24) PRIMARY KEY,
	post_id VARCHAR(24) NOT NULL,
	infra_id VARCHAR(24) NOT NULL,
	sort_order INT UNSIGNED NOT NULL DEFAULT 0,
	CONSTRAINT fk_postId
		FOREIGN KEY (post_id)
		REFERENCES posts(id)
			ON DELETE CASCADE,
	CONSTRAINT fk_infraId
		FOREIGN KEY (infra_id)
		REFERENCES infras(id)
			ON UPDATE CASCADE
			ON DELETE CASCADE
)
