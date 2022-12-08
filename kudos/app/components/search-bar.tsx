import type { Profile } from "@prisma/client";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { sortOptions } from "~/utils/constants";
import { SelectBox } from "./select-box";
import { UserCircle } from "./user-circle";

interface props {
  profile: Profile;
}

export function SearchBar({ profile }: props) {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const clearFilters = () => {
    searchParams.delete("filter");
    searchParams.delete("sort");
    navigate("/home");
  };
  return (
    <form className='w-full px-6 flex items-center gap-x-4 border-b-4 border-b-blue-900 border-opacity-30 h-20'>
      <input
        type='text'
        name='filter'
        className='w-2/3 rounded-xl px-3 py-2'
        placeholder='Search a message or name'
      />
      <SelectBox
        className='w-full rounded-xl px-3 py-2 text-gray-400'
        containerClassName='w-40'
        name='sort'
        options={sortOptions}
      />
      <button
        type='submit'
        className='rounded-xl bg-yellow-300 font-semibold text-blue-600 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1'
      >
        Search
      </button>
      {searchParams.get("filter") && (
        <button
          onClick={clearFilters}
          className='rounded-xl bg-red-300 font-semibold text-gray-400 px-3 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1'
        >
          Clear Filters
        </button>
      )}
      <div className='flex-1' />
      <UserCircle
        className='h-14 w-14 transition duration-300 ease-in-out hover:scale-110 hover:border-2 hover:border-yellow-300'
        profile={profile}
        onClick={() => navigate("profile")}
      />
    </form>
  );
}
