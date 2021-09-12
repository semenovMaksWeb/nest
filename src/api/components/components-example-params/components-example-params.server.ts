import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentsContentExampleParams } from './components-example-params.entity';
import { ComponentsContentServer } from '../components-content/components-content.server';
import { ComponentsVarServer } from '../components-var/components-var.server';
import { ComponentsExampleContent } from './validate/components-example-content';
import { ComponentsExampleVar } from './validate/components-example-var';
import { ComponentsExampleTypeEnum } from '../../../interface/components-example-type.enum';

@Injectable()
export class ComponentsExampleParamsServer {
  constructor(
    @InjectRepository(ComponentsContentExampleParams)
    private componentsContentExampleParamsRepository: Repository<ComponentsContentExampleParams>,
    private readonly componentsContentServer: ComponentsContentServer,
    private readonly componentsVarServer: ComponentsVarServer,
  ) {}
  async postComponentsExampleParamsContent(id: number, body: any[]) {
    const validate = await this.componentsContentServer.findContentIdComponents(
      id,
    );
    new ComponentsExampleContent(validate, body).validateBody();
    body.map((e: any, key) => {
      e.type_var = ComponentsExampleTypeEnum.params;
      e.componentsExample.id = id;
      e.name_params = key;
      e.value = e;
    });
    return await this.componentsContentExampleParamsRepository.save(body);
  }
  async postComponentsExampleParamsVar(id: number, body: any[]) {
    const validate = await this.componentsVarServer.findVarIdComponents(id);
    new ComponentsExampleVar(validate, body).validateBody();
    body.map((e: any, key) => {
      e.type_var = ComponentsExampleTypeEnum.style;
      e.componentsExample.id = id;
      e.name_params = key;
      e.value = e;
    });

    return await this.componentsContentExampleParamsRepository.save(body);
  }
}
