import { SetMetadata } from '@nestjs/common';

export const RouterName = (name: string) => SetMetadata('name', name);
