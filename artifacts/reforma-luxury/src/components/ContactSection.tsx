import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  nombre: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(9, "Teléfono inválido"),
  tipo: z.string().min(1, "Selecciona un tipo"),
  superficie: z.string().min(1, "Indica la superficie"),
  mensaje: z.string().min(10, "Mensaje muy corto"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      tipo: "",
      superficie: "",
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="contacto" className="py-32 px-6 md:px-12 bg-[#0a0f18] w-full perspective-[1000px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Solicita tu Presupuesto</h2>
          <p className="text-muted-foreground font-light text-lg">
            Da el primer paso hacia la transformación de tu espacio.
          </p>
        </div>

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl relative"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" style={{ transform: "translateZ(30px)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre completo" className="bg-background/50 border-border" {...field} />
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
                        <Input placeholder="tu@email.com" type="email" className="bg-background/50 border-border" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+34 600 000 000" className="bg-background/50 border-border" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="superficie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Superficie aproximada (m²)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. 120" className="bg-background/50 border-border" {...field} />
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
                        <SelectTrigger className="bg-background/50 border-border">
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
                        placeholder="Detalla tu proyecto..." 
                        className="bg-background/50 border-border min-h-[120px] resize-none" 
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
        </motion.div>
      </div>
    </section>
  );
}
