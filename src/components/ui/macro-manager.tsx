"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, Trash2, Edit, Play, Pause, Save, Plus, Settings, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Macro {
  id: string;
  name: string;
  game: string;
  type: string;
  createdAt: string;
  status: "active" | "inactive";
  usageCount: number;
  lastUsed?: string;
  configuration: {
    sensitivity: number;
    recoilControl: number;
    triggerSpeed: number;
    pressureLevel: number;
  };
}

const demoMacros: Macro[] = [
  {
    id: "m1",
    name: "Vandal Spray Pattern",
    game: "Valorant",
    type: "Recoil Control",
    createdAt: "2023-11-18",
    status: "active",
    usageCount: 347,
    lastUsed: "2023-12-24",
    configuration: {
      sensitivity: 65,
      recoilControl: 80,
      triggerSpeed: 50,
      pressureLevel: 70
    }
  },
  {
    id: "m2",
    name: "Phantom No Recoil",
    game: "Valorant",
    type: "Recoil Control",
    createdAt: "2023-10-05",
    status: "active",
    usageCount: 205,
    lastUsed: "2023-12-20",
    configuration: {
      sensitivity: 75,
      recoilControl: 90,
      triggerSpeed: 60,
      pressureLevel: 65
    }
  },
  {
    id: "m3",
    name: "Quick Scope",
    game: "Valorant",
    type: "Aim Assist",
    createdAt: "2023-09-12",
    status: "inactive",
    usageCount: 98,
    lastUsed: "2023-11-15",
    configuration: {
      sensitivity: 85,
      recoilControl: 50,
      triggerSpeed: 90,
      pressureLevel: 60
    }
  },
  {
    id: "m4",
    name: "Operator Auto Shot",
    game: "Valorant",
    type: "Trigger",
    createdAt: "2023-12-01",
    status: "active",
    usageCount: 76,
    configuration: {
      sensitivity: 60,
      recoilControl: 40,
      triggerSpeed: 95,
      pressureLevel: 80
    }
  }
];

export function MacroManager() {
  const [macros, setMacros] = useState<Macro[]>(demoMacros);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMacro, setSelectedMacro] = useState<Macro | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMacros = macros.filter(macro => {
    if (activeTab === "active" && macro.status !== "active") return false;
    if (activeTab === "inactive" && macro.status !== "inactive") return false;

    if (searchQuery) {
      return macro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             macro.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
             macro.type.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  const handleStatusToggle = (id: string) => {
    setMacros(macros.map(macro =>
      macro.id === id
        ? { ...macro, status: macro.status === "active" ? "inactive" : "active" }
        : macro
    ));
  };

  const handleDelete = (id: string) => {
    setMacros(macros.filter(macro => macro.id !== id));
    if (selectedMacro?.id === id) {
      setSelectedMacro(null);
      setEditMode(false);
    }
  };

  const handleEdit = (macro: Macro) => {
    setSelectedMacro(macro);
    setEditMode(true);
  };

  const handleConfigChange = (key: keyof Macro["configuration"], value: number) => {
    if (!selectedMacro) return;

    setSelectedMacro({
      ...selectedMacro,
      configuration: {
        ...selectedMacro.configuration,
        [key]: value
      }
    });
  };

  const handleSaveChanges = () => {
    if (!selectedMacro) return;

    setMacros(macros.map(macro =>
      macro.id === selectedMacro.id ? selectedMacro : macro
    ));

    setEditMode(false);
  };

  const handleNewMacro = () => {
    const newMacro: Macro = {
      id: `m${macros.length + 1}`,
      name: "Yeni Makro",
      game: "Valorant",
      type: "Recoil Control",
      createdAt: new Date().toISOString().split('T')[0],
      status: "inactive",
      usageCount: 0,
      configuration: {
        sensitivity: 50,
        recoilControl: 50,
        triggerSpeed: 50,
        pressureLevel: 50
      }
    };

    setMacros([...macros, newMacro]);
    setSelectedMacro(newMacro);
    setEditMode(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="bg-macrosnip-darker border-macrosnip-gray">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Makrolarım</CardTitle>
                <CardDescription>
                  Oyun makrolarınızı yönetin ve özelleştirin
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-macrosnip-gray bg-macrosnip-dark text-white hover:bg-macrosnip-gray"
                  onClick={() => handleNewMacro()}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Yeni Ekle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-macrosnip-gray bg-macrosnip-dark text-white hover:bg-macrosnip-gray"
                >
                  <Upload className="h-4 w-4 mr-1" />
                  İçe Aktar
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Input
                  className="pl-10 bg-macrosnip-dark border-macrosnip-gray"
                  placeholder="Makro ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid grid-cols-3 w-full bg-macrosnip-dark">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-macrosnip-red data-[state=active]:text-white"
                  >
                    Tümü
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    className="data-[state=active]:bg-macrosnip-red data-[state=active]:text-white"
                  >
                    Aktif
                  </TabsTrigger>
                  <TabsTrigger
                    value="inactive"
                    className="data-[state=active]:bg-macrosnip-red data-[state=active]:text-white"
                  >
                    Pasif
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent>
            {filteredMacros.length === 0 ? (
              <div className="text-center py-10">
                <div className="bg-macrosnip-dark h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">Makro bulunamadı</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {searchQuery ?
                    `"${searchQuery}" için sonuç bulunamadı. Farklı bir arama terimi deneyin veya yeni bir makro ekleyin.` :
                    "Bu kategoride makro bulunmuyor. Yeni bir makro ekleyebilir veya mevcut makroları içe aktarabilirsiniz."
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMacros.map(macro => (
                  <div
                    key={macro.id}
                    className={cn(
                      "p-4 bg-macrosnip-dark rounded-lg border hover:border-macrosnip-gray transition-all",
                      selectedMacro?.id === macro.id ? "border-macrosnip-red" : "border-macrosnip-gray/50",
                      "cursor-pointer"
                    )}
                    onClick={() => setSelectedMacro(macro)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-3">
                        <div className={cn(
                          "h-3 w-3 rounded-full mt-1.5",
                          macro.status === "active" ? "bg-green-500" : "bg-gray-500"
                        )} />
                        <div>
                          <h3 className="text-lg font-medium text-white">{macro.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-macrosnip-red/20 text-macrosnip-red mr-2">
                              {macro.game}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-macrosnip-gray/20 text-gray-300">
                              {macro.type}
                            </span>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-gray-400">
                            <span className="mr-4">{macro.usageCount} kullanım</span>
                            {macro.lastUsed && (
                              <span>Son: {macro.lastUsed}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-6">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-macrosnip-gray bg-macrosnip-darker hover:bg-macrosnip-gray text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusToggle(macro.id);
                          }}
                        >
                          {macro.status === "active" ?
                            <Pause className="h-4 w-4" /> :
                            <Play className="h-4 w-4" />
                          }
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-macrosnip-gray bg-macrosnip-darker hover:bg-macrosnip-gray text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(macro);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-macrosnip-gray bg-macrosnip-darker hover:bg-red-800 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(macro.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-macrosnip-darker border-macrosnip-gray sticky top-4">
          <CardHeader>
            <CardTitle>
              {!selectedMacro ? "Makro Detayları" : (editMode ? "Makro Düzenle" : selectedMacro.name)}
            </CardTitle>
            <CardDescription>
              {!selectedMacro
                ? "Düzenlemek için bir makro seçin"
                : (editMode ? "Makro ayarlarını özelleştirin" : "Makro kullanım ve detayları")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!selectedMacro ? (
              <div className="text-center py-10">
                <div className="bg-macrosnip-dark h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-sm text-gray-400">Detayları görüntülemek için makro seçin</h3>
              </div>
            ) : (
              <>
                {editMode ? (
                  // Düzenleme modu
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Makro Adı</label>
                      <Input
                        value={selectedMacro.name}
                        onChange={(e) => setSelectedMacro({...selectedMacro, name: e.target.value})}
                        className="bg-macrosnip-dark border-macrosnip-gray"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Oyun</label>
                        <select
                          className="w-full px-3 py-2 rounded-md bg-macrosnip-dark border border-macrosnip-gray text-white"
                          value={selectedMacro.game}
                          onChange={(e) => setSelectedMacro({...selectedMacro, game: e.target.value})}
                        >
                          <option value="Valorant">Valorant</option>
                          <option value="CS:GO">CS:GO</option>
                          <option value="Apex Legends">Apex Legends</option>
                          <option value="Fortnite">Fortnite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Tür</label>
                        <select
                          className="w-full px-3 py-2 rounded-md bg-macrosnip-dark border border-macrosnip-gray text-white"
                          value={selectedMacro.type}
                          onChange={(e) => setSelectedMacro({...selectedMacro, type: e.target.value})}
                        >
                          <option value="Recoil Control">Recoil Control</option>
                          <option value="Aim Assist">Aim Assist</option>
                          <option value="Trigger">Trigger</option>
                          <option value="Rapid Fire">Rapid Fire</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm text-gray-400">Hassasiyet</label>
                        <span className="text-xs text-gray-400">{selectedMacro.configuration.sensitivity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedMacro.configuration.sensitivity}
                        onChange={(e) => handleConfigChange("sensitivity", Number.parseInt(e.target.value))}
                        className="w-full h-2 appearance-none bg-macrosnip-dark rounded-full accent-macrosnip-red"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm text-gray-400">Recoil Kontrolü</label>
                        <span className="text-xs text-gray-400">{selectedMacro.configuration.recoilControl}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedMacro.configuration.recoilControl}
                        onChange={(e) => handleConfigChange("recoilControl", Number.parseInt(e.target.value))}
                        className="w-full h-2 appearance-none bg-macrosnip-dark rounded-full accent-macrosnip-red"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm text-gray-400">Tetik Hızı</label>
                        <span className="text-xs text-gray-400">{selectedMacro.configuration.triggerSpeed}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedMacro.configuration.triggerSpeed}
                        onChange={(e) => handleConfigChange("triggerSpeed", Number.parseInt(e.target.value))}
                        className="w-full h-2 appearance-none bg-macrosnip-dark rounded-full accent-macrosnip-red"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm text-gray-400">Basınç Seviyesi</label>
                        <span className="text-xs text-gray-400">{selectedMacro.configuration.pressureLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={selectedMacro.configuration.pressureLevel}
                        onChange={(e) => handleConfigChange("pressureLevel", Number.parseInt(e.target.value))}
                        className="w-full h-2 appearance-none bg-macrosnip-dark rounded-full accent-macrosnip-red"
                      />
                    </div>
                  </div>
                ) : (
                  // Görüntüleme modu
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-macrosnip-dark p-3 rounded-md border border-macrosnip-gray">
                      <span className="text-gray-400">Durum</span>
                      <div className="flex items-center">
                        <div className={cn(
                          "h-2 w-2 rounded-full mr-2",
                          selectedMacro.status === "active" ? "bg-green-500" : "bg-gray-500"
                        )} />
                        <span className="text-white">
                          {selectedMacro.status === "active" ? "Aktif" : "Pasif"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-macrosnip-dark p-3 rounded-md border border-macrosnip-gray">
                      <span className="text-gray-400">Oyun</span>
                      <span className="text-white">{selectedMacro.game}</span>
                    </div>

                    <div className="flex items-center justify-between bg-macrosnip-dark p-3 rounded-md border border-macrosnip-gray">
                      <span className="text-gray-400">Tür</span>
                      <span className="text-white">{selectedMacro.type}</span>
                    </div>

                    <div className="flex items-center justify-between bg-macrosnip-dark p-3 rounded-md border border-macrosnip-gray">
                      <span className="text-gray-400">Oluşturulma</span>
                      <span className="text-white">{selectedMacro.createdAt}</span>
                    </div>

                    <div className="flex items-center justify-between bg-macrosnip-dark p-3 rounded-md border border-macrosnip-gray">
                      <span className="text-gray-400">Kullanım</span>
                      <span className="text-white">{selectedMacro.usageCount} kez</span>
                    </div>

                    <div className="mt-6 space-y-3">
                      <h4 className="text-sm font-medium text-gray-300">Makro Konfigürasyonu</h4>

                      <div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                          <span>Hassasiyet</span>
                          <span>{selectedMacro.configuration.sensitivity}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-macrosnip-dark rounded-full overflow-hidden">
                          <div
                            className="h-full bg-macrosnip-red rounded-full"
                            style={{ width: `${selectedMacro.configuration.sensitivity}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                          <span>Recoil Kontrolü</span>
                          <span>{selectedMacro.configuration.recoilControl}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-macrosnip-dark rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${selectedMacro.configuration.recoilControl}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                          <span>Tetik Hızı</span>
                          <span>{selectedMacro.configuration.triggerSpeed}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-macrosnip-dark rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${selectedMacro.configuration.triggerSpeed}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                          <span>Basınç Seviyesi</span>
                          <span>{selectedMacro.configuration.pressureLevel}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-macrosnip-dark rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 rounded-full"
                            style={{ width: `${selectedMacro.configuration.pressureLevel}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>

          {selectedMacro && (
            <CardFooter className="flex justify-between border-t border-macrosnip-gray pt-4">
              {editMode ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(false)}
                    className="border-macrosnip-gray text-gray-400 hover:text-white"
                  >
                    İptal
                  </Button>
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-macrosnip-red hover:bg-macrosnip-red/90 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleStatusToggle(selectedMacro.id)}
                    className={cn(
                      "border-macrosnip-gray",
                      selectedMacro.status === "active"
                        ? "bg-red-900/20 text-red-400 hover:bg-red-900/40"
                        : "bg-green-900/20 text-green-400 hover:bg-green-900/40"
                    )}
                  >
                    {selectedMacro.status === "active" ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Devre Dışı Bırak
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Etkinleştir
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setEditMode(true)}
                    className="bg-macrosnip-red hover:bg-macrosnip-red/90 text-white"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                  </Button>
                </>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
