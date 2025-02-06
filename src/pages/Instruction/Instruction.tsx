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

const keyReplaceMap = new Map([
  ["cuotasPartes", "N° CUOTASPARTES"],
  ["clase", "CLASE A,B,C,D"],
  ["FCI", "NOMBRE DEL FCI"],
  ["cuotaPartistaApyn", "NOMBRE Y APELLIDO DEL CUOTAPARTISTA"],
  ["cuit", "N° DE CUIT"],
  ["importeEmbargo", "IMPORTE DE EMBARGO"],
  ["valorCuotaParte", "VALOR DE CUOTAPARTE"],
  ["date", "FECHA"],
]);

import instructionText from '../../../public/instruction.txt?raw'

export const Instruction = () => {
  const [params, setParams] = useState({
    cuotasPartes: "",
    clase: "",
    FCI: "",
    cuotaPartistaApyn: "",
    cuit: "",
    importeEmbargo: "",
    valorCuotaParte: "",
    date: "",
  });
  const [replacedInstruction, setReplacedInstruction] = useState(instructionText);

  useEffect(() => {
    let auxText = instructionText;
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        const regex = new RegExp(`\\[${keyReplaceMap.get(key)}\\]`, "g");
        auxText = auxText.replace(regex, value);
      }
    }
    if (params.valorCuotaParte && params.importeEmbargo) {
      auxText = auxText.replace(
        "[CUOTASPARTES A BLOQUEAR]",
        (+params.importeEmbargo / +params.valorCuotaParte).toFixed(2)
      );
    }
    setReplacedInstruction(auxText);
  }, [params, instructionText]);

  const onParamsChange = (key: keyof typeof params, value: string) => {
    setParams(() => ({ ...params, [key]: value }));
  };

  const onReset = () => {
    setParams({
      cuotasPartes: "",
      clase: "",
      FCI: "",
      cuotaPartistaApyn: "",
      cuit: "",
      importeEmbargo: "",
      valorCuotaParte: "",
      date: "",
    });
    setReplacedInstruction(instructionText);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(replacedInstruction);
  };

  if (!instructionText) return null;
  return (
    <div className="py-20 px-10">
      <h1 className="font-bold text-2xl">Instruction</h1>
      <p>
        Fill the fields, when ready, click on the clipboard icon to have it
        copied to your clipboard
      </p>

      <div className="grid grid-cols-2 gap-x-16">
        <div className="col-span-1 grid grid-cols-2 gap-x-4 mt-4">
          <div className="grid-col-span-1">
            <Label title="Cuotas Partes" />
            <Input
              placeholder="Cuotas Partes"
              onChange={(ev) => onParamsChange("cuotasPartes", ev.target.value)}
              value={params.cuotasPartes}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Clase" />
            <Select
              onValueChange={(value) => onParamsChange("clase", value)}
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
              onChange={(ev) => onParamsChange("FCI", ev.target.value)}
              value={params.FCI}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Nombre y apellido del contrapartista" />
            <Input
              placeholder="Nombre y apellido"
              onChange={(ev) =>
                onParamsChange("cuotaPartistaApyn", ev.target.value)
              }
              value={params.cuotaPartistaApyn}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="CUIT" />
            <Input
              placeholder="CUIT"
              onChange={(ev) => onParamsChange("cuit", ev.target.value)}
              value={params.cuit}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Importe de embargo" />
            <Input
              type="number"
              placeholder="Importe de embargo"
              onChange={(ev) =>
                onParamsChange("importeEmbargo", ev.target.value)
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
                onParamsChange("valorCuotaParte", ev.target.value)
              }
              value={params.valorCuotaParte}
            />
          </div>
          <div className="grid-col-span-1">
            <Label title="Fehca" />
            <Input
              placeholder="Fecha"
              onChange={(ev) => onParamsChange("date", ev.target.value)}
              value={params.date}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="p-4 bg-white relative">
            <div className="absolute top-0 right-2">
              <Copy className="cursor-pointer" onClick={onCopy} />
            </div>
            <p className="whitespace-pre-line">{replacedInstruction}</p>
          </div>
        </div>
      </div>
      <Button className="bg-blue-600 rounded-xl text-white" onClick={onReset}>Reset</Button>
    </div>
  );
};
