import _ from "lodash";
const truncate = _.truncate;
import { useState } from "react";
import { BaseProps } from "../index.types";
import { Input } from "../input-lib";

// ====== START Date Time Cells ====== //
type DateCellProps = {
  value?: Date | string;
};

export function DateCell({ value }: DateCellProps) {
  if (value === "0001-01-01T00:00:00") return <>Never</>;

  return (
    <div>
      <h5>{formatToDate(value)}</h5>
    </div>
  );
}

type DateTimeCellProps = {
  value?: Date | string;
  isLocal?: boolean;
  includeSecond?: boolean;
};

export function DateTimeCell({
  value,
  isLocal = true,
  includeSecond = false,
}: DateTimeCellProps) {
  if (value === "0001-01-01T00:00:00") return <>Never</>;
  return (
    <div>
      <h6 className="text-sm text-slate-500">{formatToDate(value, isLocal)}</h6>
      <h6 className="text-xs text-slate-400">{formatToTime(value, isLocal)}</h6>
    </div>
  );
}
type TextCopyCellProps = {
  value?: number | string;
  isButton?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "info"
    | "warning"
    | "dark"
    | "active-primary"
    | "active-secondary"
    | "active-success"
    | "active-info"
    | "active-warning"
    | "active-danger"
    | "active-dark"
    | undefined;
};
export function TextCopyCell({
  value,
  variant = "secondary",
  isButton = false,
}: TextCopyCellProps) {
  const [copyed, setCopyed] = useState<string | number | undefined>("");
  const copy = (value: string | number | undefined) => {
    navigator.clipboard.writeText(`${value}`).then(
      () => {
        /* clipboard successfully set */
        setCopyed(value);
      },
      () => {
        /* clipboard write failed */
        setCopyed("");
        console.log("clipboard write failed");
      }
    );
    setTimeout(() => {
      setCopyed("");
    }, 1000);
  };
  return (
    <div>
      <div className="flex flex-row-reverse">
        {/* <Tooltip tooltip={value}>
          <Badge
            size="sm"
            label={value as string}
            variant={variant}
            onClick={() => copy(value)}
          />
        </Tooltip> */}
        {isButton && (
          <div>
            {copyed === value ? (
              <Input.Button
                type="button"
                className="w-5 text-green-600"
                // icon={{
                //   name: "fa-check",
                // }}
                onClick={() => copy(value)}
              />
            ) : (
              <Input.Button
                type="button"
                // icon={{
                //   name: "copy",
                // }}
                onClick={() => copy(value)}
                className="w-5"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

type CopyCellProps = {
  value?: number | string;
};
export function CopyCell({ value }: CopyCellProps) {
  const [copyed, setCopyed] = useState<string | number | undefined>("");
  const copy = (value: string | number | undefined) => {
    navigator.clipboard.writeText(`${value}`).then(
      () => {
        /* clipboard successfully set */
        setCopyed(value);
      },
      () => {
        /* clipboard write failed */
        setCopyed("");
        console.log("clipboard write failed");
      }
    );
    setTimeout(() => {
      setCopyed("");
    }, 1000);
  };
  return (
    <div>
      {copyed === value ? (
        <Input.Button
          type="button"
          className="w-5 text-green-600"
          // icon={{
          //   name: "fa-check",
          // }}
          onClick={() => copy(value)}
        />
      ) : (
        <Input.Button
          type="button"
          // icon={{
          //   name: "copy",
          // }}
          onClick={() => copy(value)}
          className="w-5"
        />
      )}
    </div>
  );
}
// ====== Numerical Cells ====== //
type NumericalCellProps = {
  value: number;
  precision?: number;
  unit?: string;
};

export function NumericalCell({
  value,
  precision = 2,
  unit = "",
}: NumericalCellProps) {
  return (
    <div>
      <h5>
        {formatToString(value, precision)}
        {unit}
      </h5>
    </div>
  );
}

// ====== Text Cells ====== //
type TitleCellProps = BaseProps & {
  value: string;
  subValue?: string;
  truncateLength?: number;
};

export function TitleCell({
  value,
  subValue,
  truncateLength: length = 60,
}: TitleCellProps) {
  return (
    <div>
      <h6 className={`text-sm font-semibold text-slate-500`}>
        {truncate(value, { length })}
      </h6>
      {subValue && (
        <h6 className="text-xs text-slate-400">
          {truncate(subValue, { length })}
        </h6>
      )}
    </div>
  );
}

type SubtitleCellProps = BaseProps & {
  value: string;
};

export function SubtitleCell({ value }: SubtitleCellProps) {
  return (
    <div>
      <h6 className={`text-sm font-semibold text-slate-400`}>{value}</h6>
    </div>
  );
}

// ====== Action Cells ====== //
type ActionCellProps = BaseProps & {
  children: React.ReactNode;
};

export function ActionCell({ children }: ActionCellProps) {
  return (
    <div className="flex justify-end gap-1">
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

// ====== Code Cells ====== //
type codeProps = BaseProps & {
  value: string;
};

export function Code({ value }: codeProps) {
  return (
    <div>
      <code className="whitespace-normal text-xs text-slate-500">{value}</code>
    </div>
  );
}

// ====== Circle Image with title ====== //
type CircleImageProps = BaseProps & {
  src: string;
  alt: string;
  name: string;
};
export function CircleImageWithTitle({ src, alt, name }: CircleImageProps) {
  return (
    <div className="flex items-center">
      <div className="mr-2 grid h-6 w-6 shrink-0 items-center sm:mr-3">
        <img
          className="rounded-full"
          src={src}
          width="32"
          height="32"
          alt={alt}
        />
      </div>
      <div className="font-medium text-slate-500">{name}</div>
    </div>
  );
}
// ======= Text Cell with truncate and without text color ====== //
type TextCellProps = BaseProps & {
  value: string;
  truncateLength?: number;
};

export function TextCell({ value, truncateLength = 20 }: TextCellProps) {
  return (
    <div>
      <h5 className="text-sm">{truncate(value, { length: truncateLength })}</h5>
    </div>
  );
}

export const formatToString = (number: number, decimalPlaces = 2) => {
  const factor = Math.pow(10, decimalPlaces);
  return (Math.round(number * factor) / factor).toLocaleString();
};
/**
 * ### Format Date to `Jan 1, 2000`
 * @param date A valid JavaScript Date instance or a string that can be parsed by the Date constructor
 * @param isLocal If `true`, converts date to local time
 * @returns MMM DD, YYYY
 * @returns `null` if date is invalid
 * @example `Jan 1, 2000`
 */
export const formatToDate = (
  date?: Date | string,
  isLocal = true
): string | null => {
  // get date parts
  const dateObject = getDateObject(date, isLocal);

  if (!dateObject) return null;

  const { day, month, year } = dateObject;

  // format date
  return `${getMonthName(month)} ${day}, ${year}`;
};

/**
 * ### Format Date to `12:00 AM`
 * @param date A valid JavaScript Date instance or a string that can be parsed by the Date constructor
 * @param isLocal If `true`, converts date to local time
 * @returns HH:MM AM/PM
 * @returns `null` if date is invalid
 * @example `12:00 AM`
 */
export const formatToTime = (
  date?: Date | string,
  isLocal = true,
  includeSecond = true
): string | null => {
  // get date parts
  const dateObject = getDateObject(date, isLocal);

  if (!dateObject) return null;

  const { hour, minute, second } = dateObject;

  // format time
  const Hour = hour % 12 || 12;
  const hours = Hour < 10 ? `0${Hour}` : Hour;
  const ampm = hour < 12 || hour === 24 ? "AM" : "PM";
  const minutes = minute < 10 ? `0${minute}` : minute;
  const seconds = second < 10 ? `0${second}` : second;

  return `${hours}:${minutes}${includeSecond ? ":" + seconds : ""} ${ampm}`;
};
/**
 * ### Get date object from date
 * @param date Date or string to get date object from
 * @param isLocal If `true`, converts date to local time
 * @returns A date object with day, month, year, hour, minute and second
 */
export const getDateObject = (rawDate?: Date | string, isLocal = true) => {
  if (!isValidDate(rawDate)) return null;

  const date = new Date(rawDate);

  // convert to local time if needed
  if (isLocal) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  }

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),

    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

/**
 * ### Checks if date is valid and parsable as a Date object
 * @param date Date or string to check
 * @returns `true` if date is valid, `false` otherwise
 */
export const isValidDate = (date?: Date | string): date is Date => {
  if (!date) return false;

  if (new Date(date).toString() === "Invalid Date") return false;

  return true;
};

/**
 * ### Get month name from month number
 * @param month Month number
 * @returns Month name
 * @example getMonthName(1) // Jan
 */
export const getMonthName = (month: number) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames[month - 1];
};
