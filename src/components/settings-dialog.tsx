"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ModelConfig } from "@/types/news-analysis"
import { Settings } from "lucide-react"
import { useNewsStore } from "@/store/news-store"
import { Input } from "./ui/input"

export default function SettingsDialog() {
  const {
    apiKey,
    setApiKey,
    selectedModel,
    setSelectedModel,
    availableModels,
    addModel,
    removeModel,
  } = useNewsStore()

  const [newModelName, setNewModelName] = useState("")
  const [newModelApiUrl, setNewModelApiUrl] = useState("")
  const [newModelApiKey, setNewModelApiKey] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleAddModel = () => {
    if (!newModelName || !newModelApiUrl) return

    const newModel: ModelConfig = {
      name: newModelName,
      apiUrl: newModelApiUrl,
      apiKey: newModelApiKey,
    }

    addModel(newModel)
    setNewModelName("")
    setNewModelApiUrl("")
    setNewModelApiKey("")
  }

  const handleSelectModel = (model: ModelConfig) => {
    setSelectedModel(model)
    if (model.apiKey) {
      setApiKey(model.apiKey)
    }
  }

  const handleUpdateApiKey = (key: string) => {
    setApiKey(key)

    // Also update the API key for the selected model
    const updatedModel = {
      ...selectedModel,
      apiKey: key,
    }
    setSelectedModel(updatedModel)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>设置</DialogTitle>
          <DialogDescription>配置 API 密钥和模型</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apiKey">API 密钥</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => handleUpdateApiKey(e.target.value)}
              placeholder="输入用于当前模型的 API 密钥"
            />
          </div>

          <div className="grid gap-2">
            <Label>已配置模型</Label>
            <div className="flex flex-col gap-2">
              {availableModels.map((model) => (
                <div
                  key={model.name}
                  className="flex items-center justify-between gap-2 border p-2 rounded-md"
                >
                  <div
                    className={`flex-1 cursor-pointer ${
                      selectedModel.name === model.name
                        ? "font-semibold text-primary"
                        : ""
                    }`}
                    onClick={() => handleSelectModel(model)}
                  >
                    {model.name}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeModel(model.name)}
                    disabled={availableModels.length <= 1}
                  >
                    移除
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">添加新模型</h4>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label htmlFor="newModelName" className="text-right">
                  名称
                </Label>
                <Input
                  id="newModelName"
                  className="col-span-2"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="例如：Claude"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label htmlFor="newModelApiUrl" className="text-right">
                  API 端点
                </Label>
                <Input
                  id="newModelApiUrl"
                  className="col-span-2"
                  value={newModelApiUrl}
                  onChange={(e) => setNewModelApiUrl(e.target.value)}
                  placeholder="例如：https://api.anthropic.com/v1/complete"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <Label htmlFor="newModelApiKey" className="text-right">
                  API 密钥 (可选)
                </Label>
                <Input
                  id="newModelApiKey"
                  type="password"
                  className="col-span-2"
                  value={newModelApiKey}
                  onChange={(e) => setNewModelApiKey(e.target.value)}
                  placeholder="输入 API 密钥（可选）"
                />
              </div>
              <Button
                className="w-full mt-2"
                onClick={handleAddModel}
                disabled={!newModelName || !newModelApiUrl}
              >
                添加模型
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setIsOpen(false)}>
            保存设置
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
