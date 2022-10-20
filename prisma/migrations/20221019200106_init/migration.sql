-- CreateTable
CREATE TABLE `users` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NULL,
    `first_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NULL,
    `password` VARCHAR(255) NULL,
    `google_access_token` LONGTEXT NULL,
    `facebook_access_token` LONGTEXT NULL,
    `refresh_token_hash` LONGTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_first_name_last_name_idx`(`email`, `first_name`, `last_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
