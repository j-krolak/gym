import * as React from "react";
import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { Check } from "~/lib/icons/Check";
import { cn } from "~/lib/utils";
import { Platform } from "react-native";

function Checkbox({
  className,
  green = false,
  ...props
}: CheckboxPrimitive.RootProps & {
  ref?: React.RefObject<CheckboxPrimitive.RootRef>;
  green?: boolean;
}) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        `web:peer native:h-[20] native:w-[20] native:rounded h-4 w-4 shrink-0 rounded-sm
        disabled:cursor-not-allowed disabled:opacity-50 web:ring-offset-background
        web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring
        web:focus-visible:ring-offset-2`,
        green ? "border-2 border-gray-600" : "border border-primary",
        props.checked && (green ? "border-green-600 bg-green-600" : "bg-primary"),
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("h-full w-full items-center justify-center")}
      >
        <Check
          size={12}
          strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
          className="text-primary-foreground"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
