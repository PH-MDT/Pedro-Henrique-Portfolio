type TechBagdeProps = {
    name: string;
}


export const TechBadge = ({ name }: TechBagdeProps) => {
    return (
        <span className="text-cyan-400 bg-cyan-900/80 text-sm py-1 px-3 rounded-lg">
            {name}
        </span>
    )

}