import { User } from "../types";
import { FunctionComponent } from 'react';

const UserCard: FunctionComponent<{user : User, onUpdate: Function, onDelete: Function}> = ({user, onDelete, onUpdate})  => {
    return ( <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{`${user.firstName} ${user.lastName}`}</div>
      <p className="text-gray-700 text-base">
        Email: {user.email}<br />
        Contact Number: {user.contactNumber}<br />
        Department: {user.department}

        <button onClick={() => onUpdate(user)} className="block w-full bg-blue-500 text-white font-bold p-4 mb-2 rounded-lg">Update</button>
        <button onClick={() => onDelete(user.id)} className="block w-full bg-red-500 text-white font-bold p-4 rounded-lg">Delete</button>
        
      </p>
    </div>
  </div> );
}
 
export default UserCard;