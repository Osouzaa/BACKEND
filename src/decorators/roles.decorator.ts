import { SetMetadata } from '@nestjs/common';

export type AppRole = 'admin' | 'candidate';

export const Roles = (...roles: AppRole[]) => SetMetadata('roles', roles);
