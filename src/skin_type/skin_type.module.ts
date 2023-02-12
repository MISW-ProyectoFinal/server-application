import { Module } from "@nestjs/common";
import { SkinTypeController } from "./skin_type.controller";


@Module({
  controllers: [SkinTypeController],
})
export class SkinTypeModule {}
