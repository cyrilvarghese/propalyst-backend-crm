'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function SiteHeader() {
  const pathname = usePathname();

  // Parse route segments
  const segments = pathname.split('/').filter(Boolean);

  // Define breadcrumb labels
  const breadcrumbMap: { [key: string]: string } = {
    '': 'Home',
    'leads': 'Requirements',
    'dashboard': 'Dashboard',
    'supply': 'Supply',
    'upload': 'Upload Data',
  };

  // Generate breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const isLast = index === segments.length - 1;
    const href = '/' + segments.slice(0, index + 1).join('/');

    // Check if segment is a UUID (dynamic route)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment);

    // Use friendly label from map, or use "View" + parent label for UUIDs
    let label = breadcrumbMap[segment];
    if (!label) {
      if (isUUID && segments[index - 1]) {
        const parentLabel = breadcrumbMap[segments[index - 1]] || segments[index - 1];
        label = `View ${parentLabel.slice(0, -1)}`; // Remove 's' from plural
      } else {
        label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }
    }

    return { label, href, isLast };
  });

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-3 px-4 lg:gap-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <Breadcrumb>
          <BreadcrumbList className="gap-0">
            {/* Home breadcrumb */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Dynamic breadcrumbs */}
            {breadcrumbItems.map((item) => (
              <div key={item.href} className="flex items-center gap-0">
                <BreadcrumbSeparator className="mx-1.5" />
                <BreadcrumbItem>
                  {item.isLast ? (
                    <BreadcrumbPage className="text-foreground font-medium">{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
