import * as React from "react";
import { cn } from "~/lib/utils";
import { TextInput, type TextInputProps } from "react-native";

function Input({
  className,
  placeholderClassName,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
}) {
  return (
    <TextInput
      className={cn(
        `native:h-10 native:text-lg native:leading-[1.25] file:bg-transparentAdd commentMore
        actions h-10 border-b border-input bg-background px-3 pb-0 text-base text-foreground
        file:border-0 file:font-medium placeholder:text-muted-foreground web:flex web:w-full
        web:py-2 web:ring-offset-background web:focus-visible:outline-none
        web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2
        lg:text-sm`,
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
}

export { Input };
