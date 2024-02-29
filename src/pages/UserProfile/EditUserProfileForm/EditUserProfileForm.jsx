import {useCallback} from "react";
import HorizontalFormInput from "../../../components/formComponents/HorizontalFormInput.jsx";
import useFormData from "../../../hooks/useFormData";
import {useAddToast} from "../../../components/Toasts";
import useEditUserProfileQuery from "./useEditUserProfileQuery";

export default ({user}) => {
  const { data, fields: { uid, name, password } } = useFormData(user);
  const [ editUserProfile, { isLoading } ] = useEditUserProfileQuery();
  const addToast = useAddToast();

  const onSubmit = useCallback(async event => {
    event.preventDefault();

    const response = await editUserProfile(data);
    if (response?.error) {
      alert(response.error.message);
    } else {
      addToast('Saved')
    }
  });

  return (
    <form onSubmit={onSubmit} className="mt-3">
      <HorizontalFormInput id="uid" label="Email" type="text" value={data.uid} disabled={true} onChange={uid.setValue}/>
      <HorizontalFormInput id="name" label="Name" type="text" value={data.name} onChange={name.setValue}/>
      <HorizontalFormInput id="password" label="Password" type="text" value={data.password} onChange={password.setValue}/>
      <div className="d-flex justify-content-between py-2">
        <input type="submit" value="Save" disabled={isLoading} className="btn btn-primary mb-3 float-right"/>
      </div>
    </form>
  )
}
