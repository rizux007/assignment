import { useLoaderData } from "react-router-dom";

import { type OrdersResponse } from "@/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function OrdersList() {
  const { data: orders, meta } = useLoaderData() as OrdersResponse;

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">
        total commande : {meta.pagination.total}
      </h4>
      <Table>
        <TableCaption>Liste des commandes récentes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead className="w-[100px]">Produits</TableHead>
            <TableHead className="w-[100px]">Total</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { name, address, numItemsInCart, orderTotal, createdAt } =
              order.attributes;
            return (
              <TableRow key={order.id}>
                <TableCell>{name}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell className="text-center">{numItemsInCart}</TableCell>
                <TableCell>{orderTotal}</TableCell>
                <TableCell>{new Date(createdAt).toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default OrdersList;
