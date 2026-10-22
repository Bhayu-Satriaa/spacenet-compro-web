import type {
  ComponentPropsWithoutRef,
  ReactNode,
  Ref,
} from "react";

const controlClass =
  "min-h-11 w-full rounded border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

type FieldWrapperProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function FieldWrapper({ id, label, required, hint, error, children }: FieldWrapperProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-blue" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted">(opsional)</span>
        )}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
} & ComponentPropsWithoutRef<"input">;

export function TextField({ id, label, hint, error, required, ref, ...rest }: TextFieldProps) {
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} required={required}>
      <input
        ref={ref}
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null]
          .filter(Boolean)
          .join(" ") || undefined}
        className={controlClass}
        required={required}
        {...rest}
      />
    </FieldWrapper>
  );
}

type TextAreaFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  ref?: Ref<HTMLTextAreaElement>;
} & ComponentPropsWithoutRef<"textarea">;

export function TextAreaField({ id, label, hint, error, required, ref, ...rest }: TextAreaFieldProps) {
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        ref={ref}
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null]
          .filter(Boolean)
          .join(" ") || undefined}
        className={`${controlClass} min-h-24 resize-y`}
        required={required}
        {...rest}
      />
    </FieldWrapper>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  ref?: Ref<HTMLSelectElement>;
} & ComponentPropsWithoutRef<"select">;

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  children,
  ref,
  ...rest
}: SelectFieldProps) {
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} required={required}>
      <select
        ref={ref}
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint ? `${id}-hint` : null, error ? `${id}-error` : null]
          .filter(Boolean)
          .join(" ") || undefined}
        className={controlClass}
        required={required}
        {...rest}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
