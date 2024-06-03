import React, { useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { cloneDeep } from 'lodash';

const OutboundSchedulesCommand = (props:any) => {
  const [list, setList] = React.useState(props.item2.items as any);
  useEffect(()=>{
    props.callback(list);
  },[list])

  useEffect(()=>{
    if (JSON.stringify(list) !== JSON.stringify(props.item2.items)) {
      setList(props.item2.items);
    }
  },[props.item2.items]);
  return <ReactSortable animation={400} easing="cubic-bezier(0.7, 0, 0.84, 0)" tag="ul" list={list} setList={setList} style={props.expanded && list.length ?{}:{display:'none'}}>
    {list.map((item3:any,index3:any)=><li key={`${props.index}${props.index2}${index3}`}>
      <div className='line3'/>
      <div className={`title ${item3.highlight?'highlight':''}`}>

        <span className='fonticon icon-doc-list'/>
        <span className="text" style={{cursor: 'pointer',whiteSpace:'nowrap',maxWidth:'320px',display:'inline-block'}}
              onClick={()=>{props.addItem(cloneDeep(props.item2), cloneDeep(item3), cloneDeep(props.item), {campaign:props.index,type:props.index2,command:index3})}}
              title={item3.label}>{item3.label}</span>
        <span className='action icon-trash' onClick={()=>{props.removeItem(props.item2.items, index3) }} />
        {/*{props.item2.instant && <div className="checkbox repeat" >*/}
        {/*  <label>*/}
        {/*    <input id={`repeat${props.index}${props.index2}${index3}`} name={`repeat${props.index}${props.index2}${index3}`} type="checkbox"*/}
        {/*           className="ark-checkbox"*/}
        {/*           onChange={()=>{*/}
        {/*             item3.repeat = !item3.repeat;*/}
        {/*             props.setModel({ ...props.model });*/}
        {/*           }}*/}
        {/*           checked={item3.repeat === true}*/}
        {/*           value={item3.repeat} /><span/> { 'labelRepeat'}  </label>*/}
        {/*</div>}*/}

      </div>
    </li>)}
  </ReactSortable>
};

export default OutboundSchedulesCommand;