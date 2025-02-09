import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

import instructionText from "../../assets/instruction.txt?raw";
import { amountNumberFormatter } from "@/utils/amountFormatter";

const instructionKeys = {
  cuotasPartes: "cuotasPartes",
  clase: "clase",
  FCI: "FCI",
  cuotaPartistaApyn: "cuotaPartistaApyn",
  cuit: "cuit",
  importeEmbargo: "importeEmbargo",
  valorCuotaParte: "valorCuotaParte",
  date: "date",
  rate: "rate",
} as const;

type tInstructionKeys = keyof typeof instructionKeys;

const keyReplaceMap = new Map<tInstructionKeys, string>([
  [instructionKeys.cuotasPartes, "N° CUOTASPARTES"],
  [instructionKeys.clase, "CLASE A,B,C,D"],
  [instructionKeys.FCI, "NOMBRE DEL FCI"],
  [instructionKeys.cuotaPartistaApyn, "NOMBRE Y APELLIDO DEL CUOTAPARTISTA"],
  [instructionKeys.cuit, "N° DE CUIT"],
  [instructionKeys.importeEmbargo, "IMPORTE DE EMBARGO"],
  [instructionKeys.valorCuotaParte, "VALOR DE CUOTAPARTE"],
  [instructionKeys.date, "FECHA"],
  [instructionKeys.rate, "VALO DE COT"]
]);

const valueTransform = new Map<
  tInstructionKeys,
  (
    value: string | number,
    rest: Record<tInstructionKeys, string | number>
  ) => string
>([
  [
    instructionKeys.importeEmbargo,
    (value) => amountNumberFormatter({ amount: +value }),
  ],
  [
    instructionKeys.valorCuotaParte,
    (value, rest) =>
      amountNumberFormatter({ amount: +value * (+rest.rate || 1) }),
  ],
]);

export const Instruction = () => {
  const [params, setParams] = useState({
    [instructionKeys.cuotasPartes]: "",
    [instructionKeys.clase]: "",
    [instructionKeys.FCI]: "",
    [instructionKeys.cuotaPartistaApyn]: "",
    [instructionKeys.cuit]: "",
    [instructionKeys.importeEmbargo]: "",
    [instructionKeys.valorCuotaParte]: "",
    [instructionKeys.date]: "",
    [instructionKeys.rate]: "",
  });
  const [replacedInstruction, setReplacedInstruction] =
    useState(instructionText);

  useEffect(() => {
    let auxText = instructionText;
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        const regex = new RegExp(
          `\\[${keyReplaceMap.get(key as tInstructionKeys)}\\]`,
          "g"
        );
        auxText = auxText.replace(
          regex,
          valueTransform.get(key as tInstructionKeys)?.(value, params) || value
        );
      }
    }
    if (params.valorCuotaParte && params.importeEmbargo) {
      auxText = auxText.replace(
        "[CUOTASPARTES A BLOQUEAR]",
        amountNumberFormatter({
          amount:
            +params.importeEmbargo /
            (+params.valorCuotaParte * (+params.rate || 1)),
        })
      );
    }
    if (!params?.rate) {
      auxText = auxText.replace("COTIZACION: [VALO DE COT]", '')
    }
    if (params.valorCuotaParte) {
      const regex = new RegExp(
        `\\[VALOR DE CUOTAPARTE CONVERTIDO\\]`,
        "g"
      );
      auxText = auxText.replace(regex, params.valorCuotaParte)
    } 
    setReplacedInstruction(auxText);
  }, [params]);

  const onParamsChange = (key: tInstructionKeys, value: string) => {
    setParams(() => ({ ...params, [key]: value }));
  };

  const onReset = () => {
    setParams({
      [instructionKeys.cuotasPartes]: "",
      [instructionKeys.clase]: "",
      [instructionKeys.FCI]: "",
      [instructionKeys.cuotaPartistaApyn]: "",
      [instructionKeys.cuit]: "",
      [instructionKeys.importeEmbargo]: "",
      [instructionKeys.valorCuotaParte]: "",
      [instructionKeys.date]: "",
      [instructionKeys.rate]: "",
    });
    setReplacedInstruction(instructionText);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(replacedInstruction);
  };

  if (!instructionText) return null;
  return (
    <div className="px-10 py-20">
      <h1 className="text-2xl font-bold">Instruction</h1>
      <p>
        Fill the fields, when ready, click on the clipboard icon to have it
        copied to your clipboard
      </p>

      <div className="grid grid-cols-2 gap-x-16">
        <div className="grid grid-cols-2 col-span-1 mt-4 gap-x-4">
          <div className="grid-col-span-1">
            <Label title="Cuotas Partes" />
            <Input
              placeholder="Cuotas Partes"
              onChange={(ev) =>
                onParamsChange(instructionKeys.cuotasPartes, ev.target.value)
              }
              value={params.cuotasPartes}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Clase" />
            <Select
              onValueChange={(value) =>
                onParamsChange(instructionKeys.clase, value)
              }
              value={params.clase}
            >
              <SelectTrigger>
                <SelectValue placeholder="Clase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="D">D</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid-col-span-1">
            <Label title="FCI" />
            <Input
              placeholder="FCI"
              onChange={(ev) =>
                onParamsChange(instructionKeys.FCI, ev.target.value)
              }
              value={params.FCI}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Nombre y apellido del contrapartista" />
            <Input
              placeholder="Nombre y apellido"
              onChange={(ev) =>
                onParamsChange(
                  instructionKeys.cuotaPartistaApyn,
                  ev.target.value
                )
              }
              value={params.cuotaPartistaApyn}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="CUIT" />
            <Input
              placeholder="CUIT"
              onChange={(ev) =>
                onParamsChange(instructionKeys.cuit, ev.target.value)
              }
              value={params.cuit}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Importe de embargo" />
            <Input
              type="number"
              placeholder="Importe de embargo"
              onChange={(ev) =>
                onParamsChange(instructionKeys.importeEmbargo, ev.target.value)
              }
              value={params.importeEmbargo}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Valor de cuota parte" />
            <Input
              type="number"
              placeholder="Valor de cuota parte"
              onChange={(ev) =>
                onParamsChange(instructionKeys.valorCuotaParte, ev.target.value)
              }
              value={params.valorCuotaParte}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Rate" />
            <Input
              type="number"
              placeholder="Rate"
              onChange={(ev) =>
                onParamsChange(instructionKeys.rate, ev.target.value)
              }
              value={params.rate}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Fehca" />
            <Input
              placeholder="Fecha"
              onChange={(ev) =>
                onParamsChange(instructionKeys.date, ev.target.value)
              }
              value={params.date}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative p-4 bg-white">
            <div className="absolute top-0 right-2">
              <Copy className="cursor-pointer" onClick={onCopy} />
            </div>
            <p className="whitespace-pre-line">{replacedInstruction}</p>
          </div>
        </div>
      </div>
      <Button className="text-white bg-blue-600 rounded-xl" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};
