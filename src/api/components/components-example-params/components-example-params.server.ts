import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComponentsContentExampleParams } from './components-example-params.entity';
import { ComponentsContentServer } from '../components-content/components-content.server';
import { ComponentsVarServer } from '../components-var/components-var.server';
import { ComponentsExampleContent } from './components-example-params.validate/components-example-content';
import { ComponentsExampleVar } from './components-example-params.validate/components-example-var';
import { ComponentsExampleTypeEnum } from '../../../interface/components-example-type.enum';
import { PostComponentsExampleParamsDto } from './components-example-params.dto/post-components-example-params.dto';
import { TypeConvertInterface } from './components-example-params.interface/type-convert.interface';

@Injectable()
export class ComponentsExampleParamsServer {
  constructor(
    @InjectRepository(ComponentsContentExampleParams)
    private componentsContentExampleParamsRepository: Repository<ComponentsContentExampleParams>,
    private readonly componentsContentServer: ComponentsContentServer,
    private readonly componentsVarServer: ComponentsVarServer,
  ) {}
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
    return this.convertDataBdToReturn(data, TypeConvertInterface.object);
  }
  // из данных контента бд в удобный формат объекта!
  convertDataBdToReturn(data, type = TypeConvertInterface.array) {
    if (type === TypeConvertInterface.object) {
      return this.convertDataBdObject(data);
    }
    if (type === TypeConvertInterface.array) {
      return this.convertDataBdArray(data);
    }
  }
  convertDataBdArray(data) {
    const res = [];
    let idElem = null;
    let index = -1;
    data.forEach((e) => {
      if (idElem === null || idElem !== e.elemId) {
        idElem = e.elemId;
        index++;
        res[index] = {};
      }
      res[index][e.name_params] = e.value;
    });
    return res;
  }
  convertDataBdObject(data) {
    const res = {};
    data.forEach((e) => {
      res[e.name_params] = e.value;
    });
    return res;
  }
  // получить контент по id компонента
  async getComponentsExampleParamsIdContent(id: number) {
    const data = await this.componentsContentExampleParamsRepository.find({
      where: {
        componentsExample: id,
        type_var: ComponentsExampleTypeEnum.content,
      },
    });
    return this.convertDataBdToReturn(data);
  }

  // создать данные компонента контент
  async postComponentsExampleParamsContent(
    id: number,
    body: PostComponentsExampleParamsDto[],
  ) {
    const query = await this.getComponentsExampleParamsContentMaxElemId(id);
    console.log(query);
    const max = query.max | 0;
    const validate = await this.componentsContentServer.findContentIdComponents(
      id,
    );
    new ComponentsExampleContent(validate, body).validateBody();
    body = this.BodyAddParams(body, id, ComponentsExampleTypeEnum.content, max);
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
    body = this.BodyAddParams(body, id, ComponentsExampleTypeEnum.style);

    await this.componentsContentExampleParamsRepository.save(body);
    return 'Успешно добавлено!';
  }
  // Валидация параметров для создание данных для компонента
  private BodyAddParamsAll(
    e: PostComponentsExampleParamsDto,
    id: number,
    type: ComponentsExampleTypeEnum,
    max = 0,
  ) {
    const bodyValue: any[] = [];
    for (const eKey in e) {
      const elem = e[eKey];
      bodyValue.push({
        type_var: type,
        componentsExample: {
          id: id,
        },
        elemId: max + 1,
        name_params: eKey,
        value: elem,
      });
    }
    return bodyValue;
  }
  // Валидация параметров для создание данных для компонента
  private BodyAddParams(
    body: PostComponentsExampleParamsDto[] | PostComponentsExampleParamsDto,
    id: number,
    type: ComponentsExampleTypeEnum,
    max = 0,
  ) {
    if (!body.length) {
      return this.BodyAddParamsAll(body, id, type, max);
    } else {
      const res = [];
      body.map((e: PostComponentsExampleParamsDto) => {
        res.push(...this.BodyAddParamsAll(e, id, type, max));
      });
      return res;
    }
  }
}
