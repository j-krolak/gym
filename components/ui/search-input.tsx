import * as React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";
import { TextInput, View, type TextInputProps } from "react-native";

function SearchInput({
  className,
  placeholderClassName,
  ...props
}: TextInputProps & {
  ref?: React.RefObject<TextInput>;
}) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View
      className={cn(
        `native:h-12 flex flex-row items-center gap-2 rounded-md border border-input
        bg-background px-3`,
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className,
      )}
    >
      <TextInput
        className="native:h-12 native:text-lg native:leading-[1.25] h-10 w-full text-base text-foreground
          placeholder:text-muted-foreground web:flex web:w-full web:py-2
          web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2
          web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm"
        placeholderClassName={cn(placeholderClassName)}
        {...props}
      />
    </View>
  );
}

export { SearchInput };
