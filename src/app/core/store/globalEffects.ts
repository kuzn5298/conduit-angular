import { LogoutEffect } from './auth';
import { GetCurrentUserEffect } from './user/effects/getCurrentUser.effect';

export const globalEffects = [GetCurrentUserEffect, LogoutEffect];
