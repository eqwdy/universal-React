import { useEffect } from "react";
import JustValidate from "just-validate";
import Inputmask from "inputmask";

export default function useValidate(
  validatorRef,
  formRef,
  params = [{ key: "", rules: [] }],
  successHandler = (e) => e.preventDefault(),
) {
  useEffect(() => {
    if (!validatorRef.current && formRef.current) {
      validatorRef.current = new JustValidate(formRef.current);

      params.map((param) =>
        validatorRef.current.addField(param.key, param.rules),
      );

      validatorRef.current.onSuccess(successHandler);
    }
  }, []);
}
