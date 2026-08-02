CREATE TABLE `bridgeLinks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`telegramUrl` varchar(512) NOT NULL,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bridgeLinks_id` PRIMARY KEY(`id`),
	CONSTRAINT `bridgeLinks_slug_unique` UNIQUE(`slug`)
);
