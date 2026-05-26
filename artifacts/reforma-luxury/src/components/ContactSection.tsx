import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  nombre: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  tipo: z.string().min(1, "Selecciona un tipo de reforma"),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      tipo: "",
      mensaje: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Solicitud Recibida",
      description: "Nos pondremos en contacto contigo a la brevedad.",
    });
    form.reset();
  };

  return (
    <section id="contacto" className="py-32 px-6 md:px-12 bg-[#0a0f18] w-full">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Solicita tu Presupuesto</h2>
          <p className="text-muted-foreground font-light text-lg">
            Da el primer paso hacia la transformación de tu espacio.
          </p>
        </div>

        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu nombre completo"
                          className="bg-background/50 border-border"
                          data-testid="input-nombre"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tu@email.com"
                          type="email"
                          className="bg-background/50 border-border"
                          data-testid="input-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Tipo de Reforma</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50 border-border" data-testid="select-tipo">
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="Cocina">Cocina de Diseño</SelectItem>
                        <SelectItem value="Baño">Baño de Lujo</SelectItem>
                        <SelectItem value="Integral">Reforma Integral</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mensaje"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Cuéntanos tu proyecto..."
                        className="bg-background/50 border-border min-h-[140px] resize-none"
                        data-testid="textarea-mensaje"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full relative overflow-hidden group bg-white text-black hover:bg-white/90 text-lg font-medium tracking-wide h-14 rounded-xl"
                data-testid="button-submit-contact"
              >
                <span className="relative z-10">Enviar Solicitud</span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:animate-[glare_1s_ease-in-out_infinite]" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
