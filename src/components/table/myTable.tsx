import {HTMLProps} from "react";

export const useListHook = (props:{config:IListConfig, items:any[]}) => {
    const {config, items} = props;
    const headerHeight = 45;
    const rowHeight = 30;

    const getHeaderProps = ():HTMLProps<HTMLDivElement> => {
        return{
            className:"list-header",
            style:{
                width:"100%",
                display:"flex",
                flexDirection:"row",
            }
        }
    }

    const getRowProps = ():HTMLProps<HTMLDivElement> => {
        return {
            className:"list-row",
            style:{
                width:"100%",
                display:"flex",
                flexDirection:"row",
            }
        }
    }

    const getBodyProps = ():HTMLProps<HTMLDivElement> =>{
        return{
            style: {
                height: items.length*rowHeight,
                width: "100%"
            }
        }
    }

    const getListProps = ():HTMLProps<HTMLDivElement> => {
        return{
            style: {
                height: "100%",
                width: "100%"
            }
        }
    }

    const getRowHeight = () => `${rowHeight}px`;

    const columnGroup = config?.map((cfg, index, list)=>{
        const {displayName, internalName, width} = cfg||{};
        return {
            internalName,
            getHeaderCellProp:()=>({
                style:{
                    height:`${headerHeight}px`,
                    width:width||`${Math.floor((100 / list.length))}%`,
                    display: "flex",
                    justifyContent: "flex-start"
                }
            }),
            render:()=><div>{displayName}</div>
        }
    })

    const rows = items.map(item=>{
       return columnGroup?.map(column=>{
           const {internalName, getHeaderCellProp} = column;
           return {
               getRowCellProp: ()=>({style:{
                   ...getHeaderCellProp().style,
                       height:getRowHeight(),
                       className:"row-cell",
                       justifyContent: "flex-start"
               }}),
               render:()=><div>{item[internalName]}</div>
           }

       })
    })


    return {rows, getHeaderProps, getRowProps, getListProps, getBodyProps, columnGroup};
}

interface IListCellConfig{
    displayName:string
    internalName: string
    width?:"string"|number
}
type IListConfig = IListCellConfig[];

export const List = (props:{items:any[]}) => {
    const {items} = props;
    const config:IListConfig = [{
        displayName: "Name",
        internalName:"name"
    },{
        displayName: "Value",
        internalName: "value"
    },{
        displayName: 'Kürzel',
        internalName: 'unit',
    }
    ];

    const {getListProps, getHeaderProps, getRowProps, rows, getBodyProps, columnGroup} = useListHook({config, items});
    return <div {...getListProps()}>
        <div {...getHeaderProps()}>
            {columnGroup.map(column=><div {...column.getHeaderCellProp()}>{column.render()}</div>)}
        </div>
        <div style={{height:"100%", overflowY:"auto"}}>
            <div className={"body"} {...getBodyProps()}>
                {
                    rows?.map((row:any)=> {
                        return <div {...getRowProps()}>
                            {row.map((cell: any) =>(
                                <div {...cell.getRowCellProp()}>
                                    {cell.render()}
                                </div>
                            ))}
                        </div>
                    })
                }
            </div>
        </div>
    </div>;
}
