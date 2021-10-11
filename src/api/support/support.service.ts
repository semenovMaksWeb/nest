/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/lib/api/pagination';
import { Repository } from 'typeorm';
import { SupportFilterDto } from './support.dto/support-filter.dto';
import { Support } from './support.entity';

@Injectable()
export class SupportService {
    constructor(
        @InjectRepository(Support)
        private supportRepository: Repository<Support>,
    ){}
    getSupportAll(param:SupportFilterDto){
        const { skip, take } = Pagination(param?.limit, param?.page);
        
    }  
 }
