import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { productDefaultValues } from "@/lib/constants";
import { toast } from "sonner";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  type InsertForm = z.infer<typeof insertProductSchema>;
  type UpdateForm = z.infer<typeof updateProductSchema>;
  type ProductFormSchema = InsertForm | UpdateForm;

  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(
      type === "Create" ? insertProductSchema : updateProductSchema
    ),
    defaultValues:
      product && type === "Update"
        ? (product as UpdateForm)
        : (productDefaultValues as InsertForm),
  });

  const onSubmit = async () => {
    toast.success("on progress");
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      ></form>
    </Form>
  );
};

export default ProductForm;
