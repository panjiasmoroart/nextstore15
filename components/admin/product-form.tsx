"use client";

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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import slugify from "slugify";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

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

  const onSubmit: SubmitHandler<ProductFormSchema> = async (values) => {
    if (type === "Create") {
      console.log("masuk");
      toast.success("on progress");
    } else {
      console.log("Update form submitted", values);
    }
  };

  // const images = form.watch("images");

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={function ({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "name"
              >;
            }) {
              return (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={function ({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "slug"
              >;
            }) {
              return (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Enter slug" {...field} />
                      <Button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                        onClick={() => {
                          form.setValue(
                            "slug",
                            slugify(form.getValues("name"), { lower: true })
                          );
                        }}
                      >
                        Generate
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={function ({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "category"
              >;
            }) {
              return (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={function ({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "brand"
              >;
            }) {
              return (
                <FormItem className="w-full">
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={function ({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "price"
              >;
            }) {
              return (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={function ({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "stock"
              >;
            }) {
              return (
                <FormItem className="w-full">
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter stock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        {/* <div className="upload-field flex flex-col md:flex-row gap-5"> */}
        {/* Images */}
        {/* Images */}
        {/* </div> */}
        {/* <div className="upload-field"> */}
        {/* isFeatured */}
        {/* Featured Product */}
        {/* </div> */}
        <div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={function ({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                "description"
              >;
            }) {
              return (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting" : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
