import Link from "next/link";
import Image from "next/image";
import backIcon from "@/assets/icons/back-icon.svg";

const BackToSettings = () => {
  return (
    <div className="flex-row items-center gap-4 flex border-b border-[color:var(--color-gray-1)]">
      <Link href="/settings" className="flex p-4">
        <Image src={backIcon} width={24} height={24} alt="" />
      </Link>
      <p className="flex justify-center text-(--color-black)  font-medium text-[1.125rem] ">
        Редактирование профиля
      </p>
    </div>
  );
};

export default BackToSettings;
