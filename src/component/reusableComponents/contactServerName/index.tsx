import React from 'react';
import styles from './contactServerName.module.scss';
import CustomDropdown from '../CustomDropDown';
import { DropDownTypes, IOptionUniversal } from 'src/interfaces/dropDown';
import { useAppDispatch } from 'src/redux/hooks';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getUserDataSelector, getServersList } from 'src/redux/selectors/loginSelector';
import { setServer } from 'src/redux/actions/loginAction';
import { useToast } from 'src/component/ToastProvider';

type ContactServerNameProps = {
  list: string[];
};

const ContactServerName = (props: ContactServerNameProps) => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  const info = useSelector(getUserDataSelector);
  const serversList = useSelector(getServersList);
  const options: IOptionUniversal[] = serversList.map((x, index) => {
    return { optionLabel: x.name, optionKey: x.name };
  });
  const onSelectOption = (option: any) => {
    const server = serversList.find(x => x.name === option);
    if (server) {
      dispatch(setServer(server));
    }
    addToast('OCS', `Connected to ${option}`, 200);
  };
  return (
    <div className={styles.container}>
      <span>{'Outbound Contact Server: '}</span>
      <div className={styles.dropDownContainer}>
        <CustomDropdown
          value={info.serverName}
          placeholder={'Select a server'}
          type={DropDownTypes.OTHER}
          options={options}
          onSelectAction={onSelectOption}
        />
      </div>
    </div>
  );
};

export default ContactServerName;
