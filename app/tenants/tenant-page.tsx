"use client";
import { Eye } from "lucide-react";
import Link from "next/link";
import { TenantForm } from "@/app/tenants/tenant-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTenantStore } from "@/store/useTenantStore";

export function TenantsPage() {
// { tenants }: { tenants: Tenant[] }
	const { tenants, addTenant } = useTenantStore();
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Penyewa</CardTitle>
				<TenantForm saveForm={addTenant} />
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nama</TableHead>
							<TableHead>Kontak</TableHead>
							<TableHead>Pekerjaan</TableHead>
							<TableHead>Kamar</TableHead>
							<TableHead>Masuk</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tenants.map((t) => (
							<TableRow key={t.id}>
								<TableCell className="font-medium">
									{t.nama}
								</TableCell>
								<TableCell>{t.kontak}</TableCell>
								<TableCell>{t.pekerjaan || "-"}</TableCell>
								<TableCell>{t.kamar}</TableCell>
								<TableCell>
									{new Date(t.masuk).toLocaleDateString(
										"id-ID",
									)}
								</TableCell>
								<TableCell
									className={
										t.statusPembayaran === "lunas"
											? "text-emerald-600"
											: "text-amber-600"
									}
								>
									{t.statusPembayaran === "lunas"
										? "Lunas"
										: "Tertunggak"}
								</TableCell>
								<TableCell>
									<Button asChild variant={"outline"}>
										<Link href={`/tenants/${t.id}`}>
											<Eye />
											Detail
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
