import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GrammyExecutionContext, GrammyException } from '@grammyjs/nestjs';
import { Context } from 'grammy';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly ADMIN_IDS = [];

  canActivate(context: ExecutionContext): boolean {
    const ctx = GrammyExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();

    const isAdmin = this.ADMIN_IDS.includes(from.id);

    if (!isAdmin) {
      throw new GrammyException('You are not admin 😡');
    }

    return true;
  }
}
