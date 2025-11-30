/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './create-publication.dto';
import { UpdatePublicationDto } from './update-publication.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AuthUser } from '../auth/auth-user.interface';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  // GET /publications?author=...
  @Get()
  findAll(@Query('author') author?: string) {
    return this.publicationsService.findAll(author);
  }

  // GET /publications/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.findOne(id);
  }

  // POST /publications – только авторизованный editor
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('editor')
  create(@Body() dto: CreatePublicationDto, @Req() req: { user: AuthUser }) {
    const userId = req.user.userId;
    return this.publicationsService.create(dto, userId);
  }

  // PUT /publications/:id – только автор публикации или admin
  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePublicationDto,
    @Req() req: { user: AuthUser },
  ) {
    const publication = this.publicationsService.findOne(id);
    const user = req.user;

    const isAuthor = publication.createdBy === user.userId;
    const isAdmin = user.roles.includes('admin');

    if (!isAuthor && !isAdmin) {
      throw new ForbiddenException(
        'You can update only your own publications or as admin',
      );
    }

    return this.publicationsService.update(id, dto);
  }

  // DELETE /publications/:id – только admin
  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.publicationsService.remove(id);
    return { deleted: true };
  }
}
