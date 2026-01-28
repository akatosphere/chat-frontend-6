"use client";

interface DescriptionFieldProps {
  value: string;
}

const DescriptionField = ({ value }: DescriptionFieldProps) => {
  const hasContent = value.length > 0;

  return (
    <div className="relative">
      <div
        className={`flex px-4 ${hasContent ? "pt-6 pb-2 items-start" : "h-[56px] items-center"} cursor-text`}
      >
        <div className="flex-1 min-w-0" style={{ maxWidth: "280px" }}>
          <div
            className={`${hasContent ? "text-xs text-(--color-gray)" : "text-base text-(--color-gray)"}`}
          >
            Описание
          </div>

          {hasContent && (
            <div className="text-base text-gray-900 mt-2 break-words relative min-h-[20px]">
              {value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionField;
