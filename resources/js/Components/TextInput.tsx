import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'block w-full rounded-xl border-stone-200 bg-white px-3.5 py-2.5 text-sm text-nvet-text placeholder:text-stone-400 shadow-sm transition-all duration-150 focus:border-nvet-primary focus:outline-none focus:ring-2 focus:ring-nvet-primary/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-nvet-light dark:focus:ring-nvet-primary/30 ' +
                className
            }
            ref={localRef}
        />
    );
});
