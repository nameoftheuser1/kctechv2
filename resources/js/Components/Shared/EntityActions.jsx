import { Link, useForm } from "@inertiajs/react";

const EntityActions = ({ entity, entityName, onDelete, editRoute }) => {
    const { post } = useForm(); // Using the useForm hook to manage form submission

    if (!entity || !entity.id) {
        return null;
    }

    const handleDelete = () => {
        if (
            window.confirm(
                `Are you sure you want to delete this ${entityName}?`
            )
        ) {
            post(route(`${entityName}.destroy`, entity.id), {
                method: "DELETE",
            });
        }
    };

    return (
        <>
            <Link
                href={editRoute(entity.id)}
                className="font-medium text-blue-600 hover:underline"
            >
                Edit
            </Link>
            <button
                type="button"
                className="text-red-600 hover:underline ml-2"
                onClick={handleDelete}
            >
                Delete
            </button>
        </>
    );
};

export default EntityActions;
