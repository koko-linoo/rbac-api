-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chat_room_id_fkey` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
