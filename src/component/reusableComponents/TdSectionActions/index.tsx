// import '../CampaignInfoComponent';
import './TdSection.scss';
import IconButton from '../IconButton';


interface TdSectionProps {
  paddingLR?: number;
  bagroundColor?: string;
  column?:any;
  onClick?:any;
  el?:any;
}

const TdSectionActions = (props: TdSectionProps) => {
  const edit = () => {
    console.log(props.el);
  }
  const deleteB = () => {
    console.log('delete', props.el);
  }
  return (
    <td
      colSpan={1}
      style={{ paddingLeft: props.paddingLR, paddingRight: props.paddingLR, background: props.bagroundColor }}
      className={'text'}
    >
      {
        <>
          {props.el.state === 0 ? <IconButton click={edit} type={'controlPlay'}  /> :
          <IconButton click={edit} type={'controlStop'}  />}
          <IconButton click={edit} type={'edite'} />
          <IconButton click={deleteB} type={'delete'} /></>
      }
    </td>
  );
};

export default TdSectionActions;
