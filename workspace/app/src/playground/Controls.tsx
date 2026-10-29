/** 컨트롤 판 — Spec 의 controls 를 funky 아톰으로 그립니다 */
import { Card, FormField, Input, Select, Stack, Switch, Text } from "@studio-baeks/funky-ui";

import { ICON_NAMES } from "./registry/icons";
import type { Control, Values } from "./registry/schema";
import * as k from "./kit.css";

export function Controls({ controls, values, onChange }: { controls: Record<string, Control>; values: Values; onChange: (key: string, value: unknown) => void }) {
  return (
    <Card padding="xl" className={k.controlsPanel}>
      <Text variant="overline">Props</Text>
      <Stack gap="lg">
        {Object.entries(controls).map(([key, control]) => (
          <ControlRow key={key} name={key} control={control} value={values[key]} onChange={(v) => onChange(key, v)} />
        ))}
      </Stack>
    </Card>
  );
}

function ControlRow({ name, control, value, onChange }: { name: string; control: Control; value: unknown; onChange: (v: unknown) => void }) {
  if (control.kind === "boolean") {
    return (
      <Switch checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)}>
        <Text variant="caption" weight="black">
          {name}
        </Text>
      </Switch>
    );
  }
  if (control.kind === "select" || control.kind === "icon") {
    const options = control.kind === "icon" ? ICON_NAMES : control.options;
    return (
      <FormField label={name}>
        <Select size="sm" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
      </FormField>
    );
  }
  if (control.kind === "number") {
    return (
      <FormField label={name}>
        <Input size="sm" type="number" min={control.min} max={control.max} step={control.step} value={Number(value ?? 0)} onChange={(e) => onChange(Number(e.target.value))} />
      </FormField>
    );
  }
  return (
    <FormField label={name}>
      <Input size="sm" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
    </FormField>
  );
}
