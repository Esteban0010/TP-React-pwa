import { type ItemId, type Item as ItemType } from "../../utils/types"

interface Props extends ItemType {
    onCheckCompleted: ({ id, vista }: Pick<ItemType, 'id' | 'vista'>) => void
    onRemovePeli: ({ id }: ItemId) => void
}

export const Item: React.FC<Props> = ({ id, title, vista, onRemovePeli, onCheckCompleted }) => {
    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onCheckCompleted({
            id,
            vista: event.target.checked
        })
    }
    return (
        <div >
            <input
                className="toggle"
                checked={vista}
                type="checkbox"
                onChange={handleChangeInput}
            />
            <label>{title}</label>
            <button
                className="destroy"
                onClick={() => {
                    onRemovePeli({ id })
                }}
            />
        </div>
    )
}