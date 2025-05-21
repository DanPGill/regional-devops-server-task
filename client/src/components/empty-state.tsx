import { Card, CardContent } from "@/components/ui/card";

export const EmptyState = () => {
  return (
    <Card className="w-full mt-8">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          No Data Available
        </h3>
      </CardContent>
    </Card>
  );
};
