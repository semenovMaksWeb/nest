import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ComponentsContentExampleParams } from './components-example-params.entity';
import { ComponentsContentServer } from '../components-content/components-content.server';
import { ComponentsVarServer } from '../components-var/components-var.server';
import { ComponentsExampleContent } from './components-example-params.validate/components-example-content';
import { ComponentsExampleVar } from './components-example-params.validate/components-example-var';
import { ComponentsExampleTypeEnum } from '../../../interface/components-example-type.enum';
import { PostComponentsExampleParamsDto } from './components-example-params.dto/post-components-example-params.dto';
import { TypeConvertInterface } from './components-example-params.interface/type-convert.interface';
import { UpdateComponentsExampleParamsDto } from './components-example-params.dto/update-components-example-params.dto';
import { convertDataBdToReturn, convertParamsContentUpdate } from "./components-example-params.lib/convert-all"
import {BodyAddParams,BodyAddParamsAll} from "./components-example-params.lib/params-add-body"
import { ComponentsContent } from '../components-content/components-content.entity';
@Injectable()
export class ComponentsExampleParamsServer {
  constructor(
    @InjectRepository(ComponentsContentExampleParams)
    private componentsContentExampleParamsRepository: Repository<ComponentsContentExampleParams>,
    private readonly componentsContentServer: ComponentsContentServer,
    private readonly componentsVarServer: ComponentsVarServer,
  ) { }
  // получить max значение elem id
  async getComponentsExampleParamsContentMaxElemId(id: number) {
    return await this.componentsContentExampleParamsRepository
      .createQueryBuilder('data')
      .select('MAX(data.elemId)', 'max')
      .where('data.componentsExampleId = :id', { id })
      .getRawOne();
  }
  // получить переменные по id компонента
  async getComponentsExampleParamsIdVar(id: number) {
    const data = await this.componentsContentExampleParamsRepository.find({
      where: {
        componentsExample: id,
        type_var: ComponentsExampleTypeEnum.style,
      },
    });
    return convertDataBdToReturn(data, TypeConvertInterface.object);
  }
  // получить контент по id компонента
  async getComponentsExampleParamsIdContent(id: number) {
    const data = await this.componentsContentExampleParamsRepository.find({
      where: {
        componentsExample: id,
        type_var: ComponentsExampleTypeEnum.content,
      },
      relations: ["components"]
    });
    console.log(data);    
    return convertDataBdToReturn(data);
  }
  // функция валидации параметров контент
  async validateParams(body: any, validate:ComponentsContent[]) {
    new ComponentsExampleContent(validate, body).validateBody();
    return { validate };
  }
  // создать данные компонента контент
  async postComponentsExampleParamsContent(
    id: number,
    body: PostComponentsExampleParamsDto[],
  ) {
    const query = await this.getComponentsExampleParamsContentMaxElemId(id);
    const max = query.max | 0;
    const validate = await this.componentsContentServer.findContentIdComponents(
      id,
    );
    await this.validateParams(body, validate);
    body = BodyAddParams(body, id, ComponentsExampleTypeEnum.content, max);
    await this.componentsContentExampleParamsRepository.save(body);
    return 'Успешно добавлено!';
  }
  // создать данные компонента переменные style
  async postComponentsExampleParamsVar(
    id: number,
    body: PostComponentsExampleParamsDto,
  ) {
    const validate = await this.componentsVarServer.findVarIdComponents(id);
    new ComponentsExampleVar(validate, body).validateBody();
    body = BodyAddParams(body, id, ComponentsExampleTypeEnum.style);

    await this.componentsContentExampleParamsRepository.save(body);
    return 'Успешно добавлено!';
  }
  // изменить строчку параметров компонента
  async updateComponentsExampleParams(id: number, body: UpdateComponentsExampleParamsDto) {
    const params = await this.getComponentsExampleParamsId(id);
    if (params.elemId !== 0) {
      // контент
      const validate = await this.componentsContentServer.findContentIdComponents(
        params.componentsExample.id,
      );
      const elem = await this.getComponentsExampleParamsContent(params.componentsExample.id);
      const bodyAll = convertParamsContentUpdate(elem, body, id, validate);
      await this.validateParams(bodyAll, validate);
      await this.componentsContentExampleParamsRepository.update(id, {
        value: body.value
      })
    } else {
      // переменные
      return params;
    }

  }
  //  получить параметр по id
  async getComponentsExampleParamsId(id: number) {
    const res = await this.componentsContentExampleParamsRepository.findOne({
      relations: ['componentsExample'],
      where: {
        id
      },

    })
    if (!res) {
      this.errors404ParamsId();
    }
    return res;
  }
  //  получить параметры контента в сыром виде по componentsExampleId
  async getComponentsExampleParamsContent(componentsExampleId: number) {
    const res = await this.componentsContentExampleParamsRepository.find({
      where: {
        elemId: Not(0),
        componentsExample: componentsExampleId
      }
    })
    return res;
  }
  errors404ParamsId() {
    throw new HttpException(
      'Указанный параметр компонента не уже существует',
      HttpStatus.NOT_FOUND,
    );
  }
}
