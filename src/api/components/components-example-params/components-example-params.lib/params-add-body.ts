import { ComponentsExampleTypeEnum } from "src/interface/components-example-type.enum";
import { PostComponentsExampleParamsDto } from "../components-example-params.dto/post-components-example-params.dto";

export function BodyAddParamsAll(
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

  export function BodyAddParams(
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