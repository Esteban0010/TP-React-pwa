import { type Item as ItemType, type ItemId, type ListOfItems } from "../../utils/types"
import { Item } from "./Item"

interface Props {
    items: ListOfItems
    onCheckCompleted: ({ id, vista }: Pick<ItemType, 'id' | 'vista'>) => void
    onRemovePeli: ({ id }: ItemId) => void
}

export const Items: React.FC<Props> = ({ items, onRemovePeli, onCheckCompleted }) => {
    return (
        <ul className="todo-list">
            {items.map(item => (
                <li
                    key={item.id}
                    className={`${item.vista ? 'vista' : ''}`}>
                    <Item
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        vista={item.vista}
                        onCheckCompleted={onCheckCompleted}
                        onRemovePeli={onRemovePeli}
                    />
                </li>
            ))}
        </ul >
    )
}